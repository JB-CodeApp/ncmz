import { Suspense } from "react";
import EditPostClient from "./EditPost";

const EditPost = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPostClient />
    </Suspense>
  );
};

export default EditPost;
