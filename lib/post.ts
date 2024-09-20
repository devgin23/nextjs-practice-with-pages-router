import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // posts 파일 이름을 잡아주기
    const fileNames = fs.readdirSync(postsDirectory);
    // ['pre-rendering.md', ...]
    
    const allPostsData: any[] = fileNames.map(fileNames => {
        const id = fileNames.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileNames);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data as { date: string; title: string}
        }
    })

    // Sorting
    return allPostsData.sort((a,b) => {
        if(a.date < b.date) {
            return 1
        } else {
            return -1
        }
        
    })
}