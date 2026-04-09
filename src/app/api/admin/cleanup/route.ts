import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getProducts, getBlogs, getSettings, getContent } from "@/lib/data";

export async function POST() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ message: "No uploads dir found, nothing to clean." });
    }

    // 1. Gather all data sources
    const allData = JSON.stringify({
      products: getProducts(),
      blogs: getBlogs(),
      settings: getSettings(),
      content: getContent(),
    });

    // 2. Extract every uploaded media URL currently active in DB
    const activeUrls = new Set<string>();
    const regex = /\/uploads\/[a-zA-Z0-9_.-]+/g;
    const matches = allData.match(regex) || [];
    matches.forEach(m => activeUrls.add(m));

    // 3. Scan physical disk
    const files = fs.readdirSync(uploadsDir);
    let deletedCount = 0;

    for (const file of files) {
      if (file === ".gitkeep" || file === ".DS_Store") continue; // preserve system files
      
      const fileUrl = `/uploads/${file}`;
      
      // If disk file is not anywhere in our active JSON data, obliterate it.
      if (!activeUrls.has(fileUrl)) {
        try {
          fs.unlinkSync(path.join(uploadsDir, file));
          deletedCount++;
        } catch (err) {
          console.error(`Failed to delete orphaned file: ${file}`, err);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Garbage collection complete. Cleaned ${deletedCount} orphaned files.` 
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ success: false, error: "Failed to run cleanup task" }, { status: 500 });
  }
}
