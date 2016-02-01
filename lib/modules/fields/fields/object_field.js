Astro.ObjectField = class ObjectField extends Astro.Field {
  constructor(definition) {
    super(definition);

    this.class = definition.class === undefined ?
      null : definition.class;
  }

  validate(args) {
    super(args);
    let { doc, name, value } = args;

    if (this.class && value !== null && value !== undefined) {
      Validators.class({ doc, name, value, param: this.class });
    }
  }

	resolveValue(plainDoc) {
		let value = super(plainDoc);

		// Do not cast if value is empty.
		if (value === null || value === undefined) {
			return value;
		}
		// Cast value.
		let NestedClass = this.class;
		if (!(value instanceof NestedClass)) {
			value = new NestedClass(value);
		}

		return value;
	}
};