/**
 * cameraMount class for the camera mount
 * @class
 */

class CameraMount {        
    constructor(){
        this.servoHorizontal = new Servo(12, 1000, 2300);
        this.servoVertical = new Servo(18, 1000, 2500);

    }

}