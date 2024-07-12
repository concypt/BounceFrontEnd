import React from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./ImageUpload.css";

const ImageUpload = ({
  gallery,
  onImagesChange,
  imagesToRemove,
  setImagesToRemove,
}) => {
  //console.log(gallery);
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return {
        file,
        preview,
      };
    });
    onImagesChange([...gallery, ...newImages]);
    //console.log(gallery);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const dragImage = gallery[dragIndex];
    const updatedImages = [...gallery];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    onImagesChange(updatedImages);
  };

  const removeImage = (index) => {
    const itemToRemove = gallery[index];
    if (itemToRemove.file == null) {
      const fileName = itemToRemove.preview.split("/").pop();
      setImagesToRemove([...imagesToRemove, fileName]);
    }
    onImagesChange(gallery.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="upload-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="upload-box">
          <div className="upload-icon">+</div>
          <div className="upload-text">
            <div>Upload event images/photos</div>
            <div className="upload-recommended">
              Recommended size 1080 px wide and 600px tall
            </div>
          </div>
        </div>
      </div>
      <div className="image-preview-container">
        {gallery.map((image, index) => (
          <ImagePreview
            key={index}
            image={image}
            index={index}
            moveImage={moveImage}
            removeImage={removeImage}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const ImagePreview = ({ image, index, moveImage, removeImage }) => {
  const ref = React.useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "image",
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="image-preview"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={image.preview} alt="preview" />
      <button
        type="button"
        className="remove-button"
        onClick={() => removeImage(index)}
      >
        X
      </button>
    </div>
  );
};

ImageUpload.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.instanceOf(File),
      preview: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImagesChange: PropTypes.func.isRequired,
};

ImagePreview.propTypes = {
  image: PropTypes.shape({
    file: PropTypes.instanceOf(File),
    preview: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default ImageUpload;
