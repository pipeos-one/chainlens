export const getBufferProps = (properties: any) => {
  return Object.keys(properties)
    .filter(key => properties[key].type === 'buffer');
}

export const getUploadModelSchema = (modelSchema: any, title: string) => {
  const properties = modelSchema.definitions[title].properties;
  const bufferProps = getBufferProps(properties);

  let newprops: any = Object.assign({}, properties);
  let required = modelSchema.definitions[title].required;

  bufferProps.forEach((key: string) => {
    newprops[key] = {
      type: 'string',
      format: 'binary',
    }
    required.splice(
      required.findIndex((item: string) => item === key),
      1
    );
  });

  return {
    properties: newprops,
    required,
    additionalProperties: modelSchema.definitions[title].additionalProperties,
  }
}
