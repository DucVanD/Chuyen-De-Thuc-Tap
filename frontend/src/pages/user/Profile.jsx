const Profile = () => {
  return (
    <>
      {/* Giao diện profile` */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thông tin tài khoản
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Thông tin tài khoản
            </h2>
          </div>
          {/* thong tin tai khoan */}
        </div>
      </div>
    </>
  );
};
export default Profile;
