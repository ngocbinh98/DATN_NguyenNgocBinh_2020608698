import React, { useState } from 'react';
import { Col, Input, Label, Row, Text } from 'reactstrap';

function TextArea(props) {
  return (
    <Col lg={props.input_width}>
      <Input type="textarea" placeholder="Enter description" className="general-input" {...props.field} />
    </Col>
  );
}

function TextInput(props) {
  var check = typeof props.label === 'undefined';
  var Lab;

  if (!check)
    Lab = (
      <label
        htmlFor={props.field.name}
        style={{ textAlign: 'center', margin: 'auto', fontWeight: 'bold' }}
        className={props.classNameLabel}
      >
        {props.label}
      </label>
    );

  let Inp = <Input className="general-input" placeholder={props.placeholder} {...props.field} {...props} />;

  //console.log(props);

  return (
    <>
      {check && <>{Inp}</>}
      {!check && (
        <>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col lg={props.label_width}>{Lab}</Col>
            <Col lg={props.input_width}>{Inp}</Col>
          </Row>
        </>
      )}
    </>
  );
}

function TextInfor(props) {
  var Lab = (
    <label style={{ textAlign: 'center', margin: 'auto', fontWeight: 'bold' }} className={props.classNameLabel}>
      {props.label}
    </label>
  );

  let Text = <div className="general-infor">{props.value}</div>;

  //console.log(props);

  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col lg={props.label_width}>{Lab}</Col>
        <Col lg={props.input_width}>{Text}</Col>
      </Row>
    </>
  );
}

export { TextArea, TextInput, TextInfor };
