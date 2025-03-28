<!-- components/TableBlock.vue -->

<template>
    <table class="table-auto w-full mb-8">
      <thead>
        <tr>
          <th
            v-for="(cell, index) in headers"
            :key="index"
            class="border px-4 py-2 bg-gray-100"
          >
            {{ cell }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in dataRows"
          :key="rowIndex"
          :class="rowClass(rowIndex)"
        >
          <td
            v-for="(cell, cellIndex) in row.columns"
            :key="cellIndex"
            class="border px-4 py-2"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  const { value } = props;
  
  const rows = value.rows || [];
  
  const headers = rows[0]?.columns || [];
  
  const dataRows = rows.slice(1) || [];
  
  const rowClass = (index) => (index % 2 === 0 ? 'bg-white' : 'bg-gray-50');
  </script>