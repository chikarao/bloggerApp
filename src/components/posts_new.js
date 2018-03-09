import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// reduxForm is function allows our component to talk to redux reducer and store
// similar to connect of redux;
// RF resonsible for just state and validation
// POST request is separate
// Field is react component
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
  // return some JSX; field wires up JSX to Field
    // {...field.input} is obj contains event handler and mapStateToProps
    // onchange, onblur, onfocus, value of input
    //... says it's obj with properties we want communicated to input as props
    // const { meta: { touched, error } } = field;
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  // field.meta.error automatically added by validate function
  // meta is like title, categories, content

onSubmit(values) {
  // callback so .bind(this) so that this==== thiscomponent
  // values has title, categories, content
  // console.log(values);
  this.props.createPost(values, () => {
    this.props.history.push('/');
    // when react router renders component, passes props handlers and objs
    //automatically routes back to root
  });
}

  render() {
    const { handleSubmit } = this.props;
    // passed by reduxForm at bottom similar to mapStateToProps
    // validates form and if its okay, calls this.onSubmit

    return (
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field
        label="Title"
        name="title"
        placeholder="Enter a title of your blog!"
        component={this.renderField}
      />
      <Field
        label="Categories"
        name="categories"
        placeholder="Enter a tag"
        component={this.renderField}
      />
      <Field
        label="Post Content"
        name="content"
        placeholder="Enter your blog"
        component={this.renderField}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger">Cancel</Link>
    </form>
    );
  }
}

function validate(values) {
  //called automatically when tries to submit
  // values contains {title: 'asd', categories: 'dfdf', content: 'asdf'}
  const errors = {};

  if (!values.title) {
  errors.title = 'Enter a title, please!';
  }
  if (!values.categories) {
  errors.categories = 'Enter a category, please!';
  }
  if (!values.content || values.content.length < 5) {
  errors.content = 'Enter content, please! Content must be more than 5 characters';
  }
  // validate input from values
// if errors is empty, the form is fine to submit
// if errors has any properties, redux assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  //same as validate: validate
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
// config form is name of form; can have multiple forms on page
//form name needs to just be unique string
