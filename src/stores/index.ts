import useTagsViewStore from "./moduls/tagsView";

const useStore = () => ({
  tagsView: useTagsViewStore(),
});

export default useStore;
