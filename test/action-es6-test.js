import expect from 'expect';
import { deepFreeze } from 'deep-freeze';

const todos = (state = [], action = undefined) => {
switch(action.type){
    case 'ADD_TODO':
        return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
        ];
        break;
    default:
        return state;
}
};

const testAddTodo = () => {
    const beforeState = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const afterState = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];
    expect(
        todos(beforeState, action)
    ).toEqual(afterState);
};

testAddTodo();
console.log('Test passed!');
