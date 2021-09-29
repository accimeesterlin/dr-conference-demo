import Loader from "react-loader-spinner";

export const PageLoaderIndicator = () => (
  <div className="d-flex flex-row justify-content-center pt-5">
    <Loader
      type="Circles"
      color="#00BFFF"
      height={80}
      width={80}
      // timeout={3000} // 3 secs
    />
  </div>
);
