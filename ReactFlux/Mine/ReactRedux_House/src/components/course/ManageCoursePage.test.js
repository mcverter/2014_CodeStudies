import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';


describe ('Manage Course Page', ()=>{
  it('sets error message when saving empty title', () =>{
    const props = {
      authors: [],
      actions: {saveCourse: ()=>{return Promise.resolve();}},
      courses: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}

    };

    const wrapper = mount(<ManageCoursePage {...props} />)
    const saveButton = wrapper.find('input').last()
    expect(saveButton.prop('type')).toBe('submit')
    saveButton.simulate('click')
    expect(wrapper.state().errors.title).toBe('TItle must be at least 5')
  })
})
