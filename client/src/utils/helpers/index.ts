export const convertStringToFile = (string: string) => {
  const imageType = string?.split(';')[0].substring(4, -1);

  return {
    lastModifiedDate: new Date(),
    lastModified: new Date().getTime(),
    name: 'Current Image',
    size: 1000,
    type: imageType,
    webkitRelativePath: '',
    arrayBuffer: [],
    text: '',
    slice: () => {},
    stream: '',
  } as unknown as File;
};
