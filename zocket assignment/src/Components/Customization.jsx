import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChromePicker } from "react-color";
import Canvas from "./Canvas";

const Customization = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [image, setImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [adContent, setAdContent] = useState("");
  const [cta, setCta] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
    setBackgroundColor(newColor.hex);
  };

  const handleAdContentChange = (event) => {
    setAdContent(event.target.value);
  };

  const handleCtaChange = (event) => {
    setCta(event.target.value);
  };

  return (
    <div className="lg:flex lg:flex-row lg:justify-between md:flex md:flex-col sm:flex sm:flex-col ">
      <Canvas
        className="w-[40%] "
        image={image}
        backgroundColor={backgroundColor}
        adContent={adContent}
        cta={cta}
        strokeColor={selectedColor}
      />
      <div className=" relative lg:w-[55%] lg:my-[0px] md:my-[100px] md:w-[80%] md:mx-auto sm:my-[80px] sm:w-[80%] sm:mx-auto">
        <button
          onClick={toggleVisibility}
          className="absolute top-[24px] right-[24px] rounded-full p-[6px] bg-gray-300 text-white transform translate-x-1/2 -translate-y-1/2"
        >
          {isVisible ? "✖️" : "➖"}
        </button>
        {isVisible && (
          <div className="mt-[30px]">
            <h1 className=" font-bold text-center text-[32px]">
              Ad Customization
            </h1>
            <p className="text-center text-gray-400 text-[22px] mb-[50px]">
              Customise your ad and get the templates accordingly
            </p>
            <div className=" border-[1px] p-[10px] rounded-[10px]  my-[10px] ">
              <label htmlFor="adImageUpload" className="icon-placeholder">
                <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 34 }} />
                <p className=" inline-block">
                  Change the ad Creative image{"    "}
                  <span className=" underline text-blue-700 hover:cursor-pointer hover:text-blue-800">
                    {"  "} Select File
                  </span>
                </p>
              </label>
              <input
                id="adImageUpload"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="border-[1px] p-[10px] rounded-[10px]  my-[10px]">
              <p className=" text-gray-400 mb-[2px]">Ad content</p>
              <input
                type="text"
                className="rounded px-[10px] py-[10px] w-full"
                value={adContent}
                onChange={handleAdContentChange}
              />
            </div>
            <div className="border-[1px] p-[10px] rounded-[10px]  my-[20px]">
              <p className=" text-gray-400 mb-[2px]">CTA</p>
              <input
                type="text"
                className="rounded px-[10px] py-[10px] w-full"
                value={cta}
                onChange={handleCtaChange}
              />
            </div>
            <ColorPicker onSelectColor={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customization;

const ColorPicker = ({ onSelectColor }) => {
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const [lastColors, setLastColors] = useState([]);

  const handleColorChange = (newColor) => {
    const selectedColor = newColor.hex;
    setColor(selectedColor);
    setLastColors((prevColors) => [selectedColor, ...prevColors.slice(0, 4)]);
    onSelectColor(newColor);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleLastColorClick = (newColor) => {
    setColor(newColor);
    setShowPicker(false);
    onSelectColor(newColor);
  };

  return (
    <div className="relative">
      <p className="m-[10px] text-[18px] text-gray-400">Choose your color</p>
      {lastColors.length > 0 && (
        <div className="flex items-center">
          {lastColors.map((c, index) => (
            <div
              key={index}
              className="w-8 h-8 mx-1 cursor-pointer rounded-full"
              style={{ backgroundColor: c }}
              onClick={() => handleLastColorClick(c)}
            ></div>
          ))}
          <button
            onClick={togglePicker}
            className="ml-2 px-[6px] py-[6px] bg-gray-400 text-white rounded-full"
          >
            ➕
          </button>
        </div>
      )}

      {!showPicker && lastColors.length === 0 && (
        <button
          onClick={togglePicker}
          className="px-[6px] py-[6px] bg-gray-400 text-white rounded-full"
        >
          ➕
        </button>
      )}
      {showPicker && (
        <div className="absolute top-0 right-0 z-10">
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};
