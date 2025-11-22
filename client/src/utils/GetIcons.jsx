import {
  Image,
  PictureAsPdf,
  VideoFile,
  MusicVideo,
  FileCopy,
  Archive,
  Description,
  TableChart,
  Slideshow,
  InsertDriveFile
} from "@mui/icons-material";

export const getIcon = (type) => {
  const t = type.toLowerCase();

  if (t.includes("image")) return <Image className="w-5 h-5 text-blue-500" />;
  if (t.includes("pdf"))
    return <PictureAsPdf className="w-5 h-5 text-red-500" />;

  if (t.includes("video"))
    return <VideoFile className="w-5 h-5 text-purple-500" />;

  if (t.includes("audio"))
    return <MusicVideo className="w-5 h-5 text-green-500" />;
  if (
    t.includes("zip") ||
    t.includes("rar") ||
    t.includes("7z") ||
    t.includes("tar") ||
    t.includes("compressed")
  )
    return <Archive className="w-5 h-5 text-orange-600" />;
  if (t.includes("word") || t.includes("doc"))
    return <Description className="w-5 h-5 text-blue-700" />;
  if (t.includes("sheet") || t.includes("excel") || t.includes("xls"))
    return <TableChart className="w-5 h-5 text-green-700" />;
  if (t.includes("presentation") || t.includes("ppt"))
    return <Slideshow className="w-5 h-5 text-orange-700" />;
  return <InsertDriveFile className="w-5 h-5 text-gray-600" />;
};
