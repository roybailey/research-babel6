import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

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
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).to.eql(stateAfter);
};

testAddTodo();
console.log('Test passed!');
