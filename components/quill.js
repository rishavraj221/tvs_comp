import React, { useState, useEffect } from "react";

// export default class FormHtmlEditor extends Component {
//   constructor(props) {
//     super(props);
//     if (process.browser && document) {
//       this.quill = require("react-quill");
//     }
//   }

//   render() {
//     const Quill = this.quill;
//     if (Quill) {
//       return (
//         <Quill
//           onChange={this.props.onChange}
//           theme="bubble"
//           value={this.props.value}
//         />
//       );
//     } else {
//       return null;
//     }
//   }
// }

const FormHtmlEditor = ({ onChange, value }) => {
  const [quill, setQuill] = useState(false);
  let Quill;

  useEffect(() => {
    const temp_quill = require("react-quill");
    Quill = temp_quill;
    setQuill(temp_quill);
  }, []);

  if (quill) return <quill onChange={onChange} theme="bubble" value={value} />;
  else return <div>o halo</div>;
};

export default FormHtmlEditor;
