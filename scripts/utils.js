import { GV } from "/scripts/globalVars";
import { handleRotation, handlePinchZoom } from "/scripts/interact";

export const toRadians = (degrees) => degrees * (Math.PI / 180);

GV.renderer.domElement.addEventListener("mousedown", function (e) {
  GV.isDragging = true;
  GV.previousMousePosition = { x: e.offsetX, y: e.offsetY };
  handleRotation(e);
});

GV.renderer.domElement.addEventListener("mousemove", function (e) {
  if (GV.isDragging) {
    handleRotation(e);
  }
});

GV.renderer.domElement.addEventListener("mouseup", function () {
  GV.isDragging = false;
});

GV.renderer.domElement.addEventListener("mouseleave", function () {
  GV.isDragging = false;
});

// Add touch event listeners
GV.renderer.domElement.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevent default scrolling
  if (e.touches.length === 1) {
    GV.isDragging = true;
    const touch = e.touches[0];
    GV.previousMousePosition = { x: touch.pageX, y: touch.pageY };
    handleRotation({
      offsetX: touch.pageX,
      offsetY: touch.pageY,
    });
  } else if (e.touches.length === 2) {
    handlePinchZoom.start(e);
  }
});

GV.renderer.domElement.addEventListener("touchmove", function (e) {
  e.preventDefault(); // Prevent default scrolling
  if (GV.isDragging && e.touches.length === 1) {
    const touch = e.touches[0];
    handleRotation({
      offsetX: touch.pageX,
      offsetY: touch.pageY,
    });
  } else if (e.touches.length === 2) {
    handlePinchZoom.move(e);
  }
});

GV.renderer.domElement.addEventListener("touchend", function (e) {
  if (e.touches.length === 0) {
    GV.isDragging = false;
  }
});
