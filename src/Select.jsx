export default function Select({
    label,
    name,
    onChange,
    value,
    options,
    emptyOption
}) {

    return (

        <>



            <label class="flight-form">{ label }:</label>
            <select
                name={ name }
                onChange={ onChange }
                value={ value }
            >
                {
                    emptyOption
                        ? <option value="">{ emptyOption }</option>
                        : ''
                }
                {
                    options.map(option => (
                        <option key={ option.id } value={ option.id }>{ option.name }</option>
                    ))
                }
            </select>

        </>

    )
}