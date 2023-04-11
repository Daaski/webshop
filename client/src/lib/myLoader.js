
export  const myLoader=({src, width, quality})=>{
    return `${process.env.NEXT_PUBLIC_API_URL}/${src}?w=${width}&q=${quality || 75}`;
}