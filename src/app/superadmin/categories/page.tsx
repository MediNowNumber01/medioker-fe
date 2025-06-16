import Categories from "@/features/categories/Categories";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";

const CategoriesPage = () => {
  return <Categories />;
};

export default SuperAdminAuthGuard(CategoriesPage);
