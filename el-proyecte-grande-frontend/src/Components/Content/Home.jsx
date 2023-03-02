import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Box sx={{ height:"100%", display: "flex", flexDirection: "column", alignItems:"center" }}>
      <h2>Welcome to our hotel management system!</h2>
      <div>
        <p>
          Our software is designed to help hotel managers and staff streamline
          their daily operations, increase efficiency, and improve guest
          satisfaction.
        </p>
        <p>
          With our system, you can easily manage reservations, guest check-ins
          and check-outs, room assignments, and billing. Additionally, our
          system offers a range of reporting and analytics tools to help you
          gain insights into your hotel's performance and make informed business
          decisions.
        </p>
        <p>
          Whether you are managing a small boutique hotel or a large resort, our
          system is tailored to meet the unique needs of your property.
        </p>
      </div>
    </Box>
  );
};

export default Home;
