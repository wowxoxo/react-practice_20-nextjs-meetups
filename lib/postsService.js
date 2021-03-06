import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";
const remark = require("remark");
const html = require("remark-html");

const sortByDate = (a, b) =>
  new Date(a.date).getMilliseconds() < new Date(b.date).getMilliseconds()
    ? 1
    : -1;

const postsDir = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPathToFile = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPathToFile, "utf-8");

    const matterResult = matter(fileContents);

    // console.log("m", new Date(matterResult.data.date).getMilliseconds());

    return {
      id,
      ...matterResult.data
    };
  });

  return allPostsData.sort(sortByDate);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map((fileName) => {
    return {
      params: {
        postId: fileName.replace(/\.md$/, "")
      }
    };
  });
}

export async function getPostData(id) {
  const fullPathToFile = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPathToFile, "utf-8");

  const matterResult = matter(fileContents);

  const content = await remark().use(html).process(matterResult.content);

  console.log("content", content);

  const contentHtml = content.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}
