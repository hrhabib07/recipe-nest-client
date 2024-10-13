import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col md:flex-row gap-4 text-left">
          <div className="p-4  hover:bg-default-50 rounded-lg shadow-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold text-default-900 mb-6">
              About Us
            </h1>
            <p className="text-lg text-default-600 mb-6">
              Welcome to RecipeNest, your go-to platform for sharing and
              discovering unique recipes. Our mission is to build a vibrant
              community where food lovers can connect, share their culinary
              experiences, and inspire each other with exciting new dishes.
              Whether you are a home cook or a seasoned chef, RecipeNest is the
              perfect space for you to explore, create, and engage with others
              who share your passion for food.
            </p>
          </div>
          <div className="p-4  hover:bg-default-50 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-default-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-default-600 mb-6">
              Our mission is simple: to create a community-driven platform where
              people from all walks of life can come together and share their
              love for cooking. We believe that food brings people closer, and
              we aim to provide a space where users can exchange ideas, learn
              from one another, and discover new ways to enjoy the culinary
              arts.
            </p>
          </div>
          <div className="p-4  hover:bg-default-50 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-default-900 mb-4">
              The Team
            </h2>
            <p className="text-lg text-default-600 mb-6">
              We are a group of passionate developers, designers, and food
              enthusiasts committed to delivering a platform that is both
              user-friendly and valuable to our community. From frontend
              development to backend support, we strive to make RecipeNest a
              seamless and enjoyable experience for all users.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <img
            alt="Team"
            className="rounded-lg shadow-lg mx-auto"
            src="https://images.pexels.com/photos/6804603/pexels-photo-6804603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <p className="text-lg text-default-600 mt-4">
            Our amazing team working together to bring RecipeNest to life!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
