import { Rings } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Rings
        height="200"
        width="200"
        color="#000000"
        radius="6"
        wrapperStyle={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          textAlign: "center",
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Spinner;
