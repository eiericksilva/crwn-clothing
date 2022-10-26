import '../form-input/form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            
            {/* otherProps contem name, onChange, required, type e value */}
            <input className="form-input" {...otherProps}/>
            
            {label && (
                <label 
                    className={`${
                        otherProps.value.length > 0 ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;