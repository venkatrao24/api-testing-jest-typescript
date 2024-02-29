import Ajv, { JSONSchemaType } from 'ajv';

// https://ajv.js.org/strict-mode.html#prevent-unexpected-validation
const ajv = new Ajv.default({ allowMatchingProperties: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSchema: true | any = (
  schema: JSONSchemaType<any>,
  inputData: any,
) => {
  const validate = ajv.compile(schema);

  if (validate(inputData)) {
    return true;
  } else {
    // If scheme does not valid, we will receive an error massage, instead of "false"
    return validate.errors;
  }
};

export { validateSchema };
