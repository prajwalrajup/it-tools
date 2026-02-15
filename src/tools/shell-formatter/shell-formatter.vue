<script setup lang="ts">
import { formatShellCommand } from '@/utils/shell-formatter';

const defaultValue = 'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx';

function transformer(value: string) {
  try {
    return formatShellCommand(value);
  }
  catch (e: any) {
    return `# ERROR: ${e.toString()}`;
  }
}
</script>

<template>
  <format-transformer
    input-label="Shell commands to format"
    :input-default="defaultValue"
    input-placeholder="Put your shell commands to format here..."
    output-label="Formatted shell commands"
    output-language="bash"
    :transformer="transformer"
  />
</template>
