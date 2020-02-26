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
    console.log('key', key);
    newprops[key] = {
      type: 'string',
      format: 'binary',
    }
    console.log('required', required);
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

export const getUploadModelSchemaRecursive = (modelSchema: any, title: string) => {
  console.log('modelSchema', JSON.stringify(modelSchema));
  const upload_schema = getUploadModelSchema(modelSchema, title);
  console.log('upload_schema', JSON.stringify(upload_schema));
  return upload_schema;
}
