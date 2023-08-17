<template>
  <EntityPage
    entity-type="product"
    :title="title"
    :item="state.entity"
    :loading="state.loading"
    :is-new="isNew()"
    :is-deletable="!isNew()"
  >
    <template #form-content>
      <div>
        <v-row align="start">
          <v-col cols="12">
            <v-text-field
              v-model="state.entity.name"
              label="Name"
              variant="outlined"
              required
              hide-details="auto"
              :rules="rules.name"
              data-test="product-name"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="state.entity.categoryId"
              label="Category ID"
              variant="outlined"
              hide-details="auto"
              :items="listCategory"
              item-title="name"
              item-value="id"
              data-test="product-categoryId"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="state.entity.description"
              label="Description"
              variant="outlined"
              hide-details="auto"
              data-test="product-categoryId"
            />
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="state.entity.previewImage"
              label="Preview image"
              variant="outlined"
              hide-details="auto"
              accept="image/png, image/jpg"
              :rules="rules.previewImage"
              data-test="product-previewImage"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </EntityPage>
</template>

<script lang="ts">
import EntityPage from '@/components/common/EntityPage.vue';
import { defineComponent, onBeforeMount, reactive, watch, computed, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Product } from '../../../models/entities/Product';

interface State {
  entity: Product;
  loading: boolean;
}

const Component = defineComponent({
  name: 'ProductDialog',

  components: {
    EntityPage,
  },

  props: {
    id: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const IMAGE_MAX_SIZE = 1048576;

    const store = useStore();
    const router = useRouter();
    const product = new Product({});
    const isNew = () => !props.id;
    let listCategory: Ref<string[]> = ref([]);

    onBeforeMount(async () => {
      if (!isNew()) {
        const res = await store.dispatch(`productsModule/fetchItem`, props.id);
        if (!res) router.back();
      }
      listCategory.value = await store.dispatch(
        'categoriesModule/fetchAllItems',
        undefined,
      );
    });

    const state = reactive({
      entity: product,
      loading: computed(() => store.getters['productsModule/loading']),
    }) as State;

    watch(
      () => store.getters['productsModule/selectedItem'],
      (newValue: Product) =>
        Object.assign(product, newValue, {
          previewImage:
            newValue.previewImage instanceof File ? newValue.previewImage : [],
        }),
      { immediate: false, deep: true },
    );
    const title = computed(() => {
      if (state.loading) return '';
      if (isNew()) return 'New Product';
      const getSelectedItem = store.getters['productsModule/selectedItem'];
      return getSelectedItem.name;
    });
    const rules = {
      name: [(v: string) => !!v || 'Name is required'],
      previewImage: [
        (v: FileList) => (v[0] ? v[0].size < IMAGE_MAX_SIZE : true) || 'Max size is 1Mb',
      ],
    };

    return {
      state,
      title,
      rules,
      isNew,
      listCategory,
    };
  },
});
export default Component;
</script>

<style scoped></style>
