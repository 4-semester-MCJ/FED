namespace MauiCalc;

public partial class MainPage : ContentPage
{
	public string CurrentInput { get; set; } = string.Empty;
	public string RunningTotal { get; set; } = string.Empty; 
	private string? selectedOperator; 
	string[] operators = { "+", "-", "*", "/", "="};
	string [] numbers = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."};
	bool resetOnNextInput = false; 

	public MainPage()
	{
		InitializeComponent();
	}
	public void ButtonClicked(object sender, EventArgs e)
	{
		// Cast sender to Button type to read its text
		var btn = sender as Button;
		if (btn == null) return; // Ensure btn is not null

		// Assign the value of the Button's Text property to a temporary variable
		var thisInput = btn.Text;

		if (numbers.Contains(thisInput))
		{
			if (resetOnNextInput)
			{
				CurrentInput = thisInput;
				resetOnNextInput = false;
			}
			else
			{
				CurrentInput += thisInput;
			}
			LCD.Text = CurrentInput;
		}
		else if (operators.Contains(thisInput))
		{
			// Perform the calculation and store the result
			var result = PerformCalculation();

			if (thisInput == "=")
			{
				CurrentInput = result.ToString();
				LCD.Text = CurrentInput;
				RunningTotal = string.Empty;
				selectedOperator = string.Empty;
				resetOnNextInput = true;
			}
			else
			{
				RunningTotal = result.ToString();
				selectedOperator = thisInput;
				CurrentInput = string.Empty;
				LCD.Text = CurrentInput;
			}
		}
	}

	private double PerformCalculation()
	{
		double currentVal; 
		// Cast CurrentInput from string to double to perform arithmetic operations on it
		double.TryParse(CurrentInput, out currentVal);
		double runningVal; 
		double.TryParse(RunningTotal, out runningVal);
		double result;

		switch (selectedOperator)
		{
			case "+":
				result = runningVal + currentVal;
				break;
			case "-":
				result = runningVal - currentVal;
				break;
			case "*":
				result = runningVal * currentVal;
				break;
			case "/":
				result = runningVal / currentVal;
				break;
			default:
				result = currentVal;
				break;
		}
		return result;
	}

}

