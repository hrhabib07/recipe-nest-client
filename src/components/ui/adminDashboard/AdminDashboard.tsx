"use client";
import {
  useAllPostData,
  useAllPostDataForAdmin,
  useGetPostDataWithQuery,
} from "@/src/hooks/post.hook";
import { useAllAdminsData, useAllUsersData } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button"; // Import NextUI buttons or use Tailwind if preferred
import { useState } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("users");

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserManagement />;
      case "recipes":
        return <RecipeManagement />;
      case "admins":
        return <AdminAccountManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-default flex flex-col p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <button
          className={`p-3 text-left hover:bg-default rounded ${selectedSection === "users" && "bg-default-100"}`}
          onClick={() => setSelectedSection("users")}
        >
          Manage Users
        </button>
        <button
          className={`p-3 text-left hover:bg-default rounded ${selectedSection === "recipes" && "bg-default-100"}`}
          onClick={() => setSelectedSection("recipes")}
        >
          Manage Recipes
        </button>
        <button
          className={`p-3 text-left hover:bg-default rounded ${selectedSection === "admins" && "bg-default-100"}`}
          onClick={() => setSelectedSection("admins")}
        >
          Manage Admins
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <div className="bg-default-50 p-6 rounded-lg shadow-md">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const UserManagement = () => {
  // Dummy data (replace with actual API data)
  // console.log("user", loggedInUser);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const {
    data: allUserData,
    refetch,
    isLoading,
    isSuccess,
  } = useAllUsersData(searchTerm);
  const users = allUserData?.data;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">User Management</h3>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none md:table-row">
            <th className="block md:table-cell p-3 text-left font-bold">
              Name
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Email
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Status
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users?.map((user: any) => (
            <tr key={user.id} className="border md:border-none md:table-row">
              <td className="block md:table-cell p-3">{user.name}</td>
              <td className="block md:table-cell p-3">{user.email}</td>
              <td className="block md:table-cell p-3">{user.status}</td>
              <td className="block md:table-cell p-3">
                <Button
                  className="mr-2"
                  onClick={() => handleBlockUnblock(user)}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </Button>
                <Button onClick={() => handleDelete(user)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleBlockUnblock(user: any) {
    toast.error("This feature will be implemented soon");
    // // Logic to block/unblock users
    // console.log(
    //   `${user.status === "active" ? "Blocking" : "Unblocking"} user`,
    //   user.name
    // );
  }

  function handleDelete(user: any) {
    // Logic to delete user
    toast.error("This feature will be implemented soon");

    // console.log("Deleting user", user.name);
  }
};

const RecipeManagement = () => {
  // Dummy data (replace with actual API data)
  const {
    data: allPosts,
    isLoading,
    isError,
    error,
  } = useAllPostDataForAdmin();
  const posts = allPosts?.data;
  //   console.log("post", posts);
  //   const recipes = [
  //     { id: 1, name: "Spaghetti Bolognese", author: "John Doe" },
  //     { id: 2, name: "Chicken Curry", author: "Jane Smith" },
  //   ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Recipe Management</h3>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none md:table-row">
            <th className="block md:table-cell p-3 text-left font-bold">
              Thumbnail
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Recipe
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Author
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {posts?.map((recipe: any) => (
            <tr key={recipe.id} className="border md:border-none md:table-row">
              <td className="block md:table-cell p-3">
                {" "}
                <img src={recipe.images[0]} className="size-20" alt="" />{" "}
              </td>
              <td className="block md:table-cell p-3">{recipe.title}</td>
              <td className="block md:table-cell p-3">{recipe.user.name}</td>
              <td className="block md:table-cell p-3">
                <Button
                  className="mr-2"
                  onClick={() => handleDeleteRecipe(recipe)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDeleteRecipe(recipe: any) {
    toast.error("This feature will be implemented soon");
  }
};

const AdminAccountManagement = () => {
  // Dummy data (replace with actual API data)
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const {
    data: allAdminsData,
    refetch,
    isLoading,
    isSuccess,
  } = useAllAdminsData(searchTerm);
  const admins = allAdminsData?.data;
  //   console.log(adminsData);
  //   const admins = [
  //     { id: 1, name: "Admin1", email: "admin1@example.com" },
  //     { id: 2, name: "Admin2", email: "admin2@example.com" },
  //   ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Admin Account Management</h3>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none md:table-row">
            <th className="block md:table-cell p-3 text-left font-bold">
              Admin Name
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Email
            </th>
            <th className="block md:table-cell p-3 text-left font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {admins?.map((admin: any) => (
            <tr key={admin.id} className="border md:border-none md:table-row">
              <td className="block md:table-cell p-3">{admin.name}</td>
              <td className="block md:table-cell p-3">{admin.email}</td>
              <td className="block md:table-cell p-3">
                <Button
                  className="mr-2"
                  onClick={() => handleDeleteAdmin(admin)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button color="primary" onClick={() => handleCreateAdmin()}>
        Create New Admin
      </Button>
    </div>
  );

  function handleDeleteAdmin(admin: any) {
    toast.error("This feature will be implemented soon");
    // Logic to delete an admin
    // console.log("Deleting admin", admin.name);
  }

  function handleCreateAdmin() {
    // Logic to create a new admin
    toast.error("This feature will be implemented soon");
    // console.log("Creating a new admin");
  }
};
