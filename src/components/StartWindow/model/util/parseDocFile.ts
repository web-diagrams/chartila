import { DocDto } from "@/shared/types/doc";

export const parseDocFile = async (file: File): Promise<DocDto> => {
  const text = await file.text();
  const data = JSON.parse(text);

  if (!data.pages || !data.id || !data.name) {
    throw new Error("Некорректный формат файла: отсутствуют pages или id или name");
  }

  return data;
};
