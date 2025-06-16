import Categories from "@/app/feature/categories/Categories";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";

const CategoriesPage = () => {
  return <Categories />;
};

export default SuperAdminAuthGuard(CategoriesPage);
