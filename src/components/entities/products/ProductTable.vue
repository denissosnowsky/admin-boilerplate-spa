<template>
  <EntityTable :entity-type="entityType" :headers="state.headers" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { EntityType } from '../../../store/entityModules/types';
import EntityTable from '../../common/EntityTable.vue';

const Component = defineComponent({
  name: 'ProductTable',

  components: {
    EntityTable,
  },

  setup() {
    const entityType = EntityType.PRODUCT;

    const state = reactive({
      headers: [
        { title: 'Name', key: 'name', sortable: true, searchable: true },
        { title: 'Category ID', key: 'categoryId', sortable: true },
        { title: 'Description', key: 'description', sortable: false },
        { title: 'Preview Image', key: 'previewImage', sortable: false },
        { title: 'Details', key: 'actions', sortable: false },
        { title: 'Visibility', key: 'hidden', sortable: false },
      ],
    });

    return {
      entityType,
      state,
    };
  },
});
export default Component;
</script>

<style lang="scss" scoped></style>
