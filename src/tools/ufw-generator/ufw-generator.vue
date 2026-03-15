<script setup lang="ts">
const state = reactive({
  action: 'allow',
  direction: 'in',
  protocol: 'tcp',
  port: '',
  portTo: '',
  fromIp: '',
  toIp: '',
  interface: '',
  log: false,
  comment: '',
});

const actionOptions = [
  { label: 'Allow', value: 'allow' },
  { label: 'Deny', value: 'deny' },
  { label: 'Reject', value: 'reject' },
  { label: 'Limit', value: 'limit' },
];

const directionOptions = [
  { label: 'Incoming', value: 'in' },
  { label: 'Outgoing', value: 'out' },
];

const protocolOptions = [
  { label: 'TCP', value: 'tcp' },
  { label: 'UDP', value: 'udp' },
  { label: 'Any', value: 'any' },
];

const ufwCommand = computed(() => {
  try {
    const parts: string[] = ['ufw'];

    // action
    parts.push(state.action);

    // direction
    if (state.direction) {
      parts.push(state.direction);
    }

    // port or port range
    if (state.port && state.portTo) {
      parts.push(`${state.port}:${state.portTo}`);
    }
    else if (state.port) {
      parts.push(state.port);
    }
    else {
      throw new Error('Missing port');
    }

    // protocol
    if (state.protocol !== 'any') {
      parts.push(`proto ${state.protocol}`);
    }

    // from
    if (state.fromIp) {
      parts.push(`from ${state.fromIp}`);
    }

    // to
    if (state.toIp) {
      parts.push(`to ${state.toIp}`);
    }

    // interface
    if (state.interface) {
      parts.push(`on ${state.interface}`);
    }

    // logging
    if (state.log) {
      parts.push('log');
    }

    // comment
    if (state.comment) {
      parts.push(`comment '${state.comment.replace(/'/g, '')}'`);
    }

    return parts.join(' ');
  }
  catch (e: any) {
    return e.toString();
  }
});
</script>

<template>
  <div>
    <NForm label-placement="left" label-width="120">
      <NFormItem label="Action:">
        <NSelect v-model:value="state.action" :options="actionOptions" />
      </NFormItem>

      <NFormItem label="Direction:">
        <NSelect v-model:value="state.direction" :options="directionOptions" />
      </NFormItem>

      <NFormItem label="Protocol:">
        <NSelect v-model:value="state.protocol" :options="protocolOptions" />
      </NFormItem>

      <NFormItem label="Port:">
        <NInput v-model:value="state.port" placeholder="80" />
      </NFormItem>

      <NFormItem label="Port to (range):">
        <NInput v-model:value="state.portTo" placeholder="443" />
      </NFormItem>

      <NFormItem label="From IP:">
        <NInput v-model:value="state.fromIp" placeholder="192.168.1.10" />
      </NFormItem>

      <NFormItem label="To IP:">
        <NInput v-model:value="state.toIp" placeholder="10.0.0.5" />
      </NFormItem>

      <NFormItem label="Interface:">
        <NInput v-model:value="state.interface" placeholder="eth0" />
      </NFormItem>

      <NFormItem label="Logging:">
        <NSwitch v-model:value="state.log" />
      </NFormItem>

      <NFormItem label="Comment:">
        <NInput v-model:value="state.comment" placeholder="Optional comment" />
      </NFormItem>
    </NForm>

    <n-card v-if="ufwCommand" title="Generated Command">
      <textarea-copyable :value="ufwCommand" />
    </n-card>
  </div>
</template>
