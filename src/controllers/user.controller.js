
import userModel from '../models/user.model.js';
import { generateAiResponse } from '../lib/utils.js';

const getAiRecomendation = async (req, res) => {
  const { id } = req.params;
  const userData = await userModel.findById(id);
  console.log(userData);
  
  const promt = `${userData} "You are a personalized fitness and nutrition coach specializing in Kerala-style cuisine. Analyze the following user data and generate tailored recommendations in JSON format only. Do not include any additional text outside the JSON.
User Data: [Insert user details here, e.g., {'name': 'John Doe', 'age': 28, 'gender': 'male', 'current_weight': 75, 'height': 170, 'goal': 'weight loss', 'activity_level': 'sedentary', 'preferences': 'vegetarian', 'medical_conditions': 'none', 'current_diet': 'mixed', 'current_workout': 'none'}]
Output Structure:
{
'diet_recommendations': {
'daily_calories': number,
'meal_plan': [
{
'meal': 'Breakfast',
'dishes': ['Kerala-style puttu with kadala curry', 'description': 'Steamed rice cake with black chickpea curry – high in fiber, ~300 kcal'],
'kerala_focus': 'Traditional steamed carbs with protein-rich curry for sustained energy'
},
// Add Lunch, Dinner, Snacks similarly – 3 meals + 2 snacks, all Kerala-inspired (e.g., appam with stew, fish moilee, banana chips in moderation)
],
'tips': ['Incorporate coconut oil sparingly for healthy fats', 'Hydrate with tender coconut water']
},
'workout_plan': {
'weekly_routine': [
{
'day': 'Monday',
'exercises': [
{'name': 'Bodyweight Squats', 'sets': 3, 'reps': 12, 'duration': 'N/A'},
{'name': 'Plank', 'sets': 3, 'duration': '30s'}
],
'total_time': '30 min',
'focus': 'Lower body and core'
}
// 5-6 days, mix cardio (e.g., brisk walking in Kerala backwaters style), strength, flexibility; rest day
],
'progression': 'Start with 3 days/week, increase intensity every 2 weeks'
},
'goal_achievement_strategy': {
'short_term': ['Track weekly weigh-ins', 'Log meals in app'],
'long_term': ['Aim for 1kg loss/week', 'Reassess goal every month'],
'milestones': ['Week 4: 4kg lost', 'Month 3: Visible toning'],
'potential_challenges': ['Plateaus – adjust calories', 'Motivation dips – accountability partner'],
'success_metrics': ['Weight, energy levels, consistency score']
},
'daily_motivation': {
'morning_quote': 'Rise like the Kerala sun – strong, warm, and ready to conquer your day!',
'affirmation': 'Every step towards my goal is a victory; today, I choose health and strength.',
'quick_tip': 'Start with a 5-min stretch to awaken your body and mind.'
}
}
Ensure recommendations are realistic, safe, and culturally sensitive to Kerala cuisine (e.g., use sadhya-inspired balanced meals with rice, fish, veggies). Base calorie/workout on standard formulas (e.g., BMR * activity factor for calories). If data is missing, assume defaults (e.g., moderate goal)."
`;
  const response = await generateAiResponse(promt);
  console.log(response);
  return res.  status(200).json({response})
};
export { getAiRecomendation };