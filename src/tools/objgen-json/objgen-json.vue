<script setup lang="ts">
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { ObjGen2Json } from '@/utils/objgen';

const defaultValue = `// Model & generate Live JSON data values
// interactively using a simple syntax.
// String is the default value type
product = Live JSON generator

// Number, Date & Boolean are also supported
// Specify types after property names
version n = 3.1
releaseDate d = 2014-06-25
demo b = true

// Tabs or spaces define complex values
person
  id number = 12345
  name = John Doe
  phones
    home = 800-123-4567
    mobile = 877-123-1234

  // Use [] to define simple type arrays
  email[] s = jd@example.com, jd@example.org
  dateOfBirth d = 1980-01-02
  registered b = true

  // Use [] or [n] to define object arrays
  emergencyContacts[]
    name s = Jane Doe
    phone s = 888-555-1212
    relationship = spouse
  emergencyContacts[]
    name s = Justin Doe
    phone s = 877-123-1212
    relationship = parent
`;

const indentSize = useQueryParamOrStorage({ name: 'indent', storageName: 'objgen-json:i', defaultValue: 2 });

function transformer(value: string) {
  try {
    return ObjGen2Json(value, { numSpaces: indentSize.value });
  }
  catch (e: any) {
    return `/* ERROR: ${e.toString()} */`;
  }
}
</script>

<template>
  <details mb-1>
    <summary>Documentation</summary>
    <textarea-copyable :value="defaultValue" language="toml" />
  </details>

  <format-transformer
    input-label="ObjGen JSON definition"
    :input-default="defaultValue"
    input-placeholder="Put your ObjGen JSON definition here..."
    output-label="Generated JSON"
    output-language="json"
    :transformer="transformer"
    download-file-name="output.json"
  />
</template>
