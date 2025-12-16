// In this sample:
// Set PWM duty cycle: pin 1 = 10%, pin 2 = 20%, ... pin 8 = 80%

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetFrequency(int pin, int frequency, float dutycyle) {

    duelink.Engine.ExecuteCommand($"freq({pin},{frequency}, 0, {dutycyle})");
}

SetFrequency(1, 1000, 0.1f); // Set pin 1 frequency 1KHz, dutycycle 10%
SetFrequency(2, 1000, 0.2f); // Set pin 1 frequency 1KHz, dutycycle 20%
SetFrequency(3, 1000, 0.3f); // Set pin 1 frequency 1KHz, dutycycle 30%
SetFrequency(4, 1000, 0.4f); // Set pin 1 frequency 1KHz, dutycycle 40%
SetFrequency(5, 1000, 0.5f); // Set pin 1 frequency 1KHz, dutycycle 50%
SetFrequency(6, 1000, 0.6f); // Set pin 1 frequency 1KHz, dutycycle 60%
SetFrequency(7, 1000, 0.7f); // Set pin 1 frequency 1KHz, dutycycle 70%
SetFrequency(8, 1000, 0.8f); // Set pin 1 frequency 1KHz, dutycycle 80%


