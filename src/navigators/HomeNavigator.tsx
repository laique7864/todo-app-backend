import { createStackNavigator } from "@react-navigation/stack";
import Todos from "../screens/TodoList";
import AddTodoScreen from "../screens/AddTodoList";

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="TodoList"
        options={{
          title: "Todo List",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF"            
          },
          headerTintColor: "#3E4857",
        }}
        component={Todos}
      />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} />

    </Stack.Navigator>
  );
}
