const dialogs = ref<Dialog[]>([]);

class Dialog {
  title: string;
  subtitle: string;
  fields: Field[];

  private resolve!: null | ((value: Map<string, string>) => void);
  private reject!: null | ((reason?: any) => void);

  constructor(title: string, subtitle: string, fields: Field[]) {
    this.title = title;
    this.subtitle = subtitle;
    this.fields = fields;
  }

  open(): Promise<Map<string, string>> {
    dialogs.value.push(this);

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  close() {
    if (this.resolve && this.reject) {
      this.reject('Canceled by user');
    }

    dialogs.value.pop();
  }

  submit() {
    if (this.resolve) {
      this.resolve(
        new Map(
          this.fields.map((field) => [
            field.label,
            typeof field.value === 'string' ? field.value : field.value.join(','),
          ])
        )
      );
      this.resolve = null;
      this.reject = null;
    }

    this.close();
  }
}

interface SelectFieldOptionGroup {
  type: 'group';
  label: string;
  options: SelectFieldOptionItem[];
}

interface SelectFieldOptionItem {
  type: 'item';
  label: string;
  value: string;
}

type SelectFieldOption = SelectFieldOptionItem | SelectFieldOptionGroup;

interface SelectField {
  type: 'select';
  label: string;
  options: SelectFieldOption[];
  value: string;
}

interface TextField {
  type: 'text';
  label: string;
  value: string;
}

interface TagField {
  type: 'tag';
  label: string;
  value: string[];
}

type Field = SelectField | TextField | TagField;

export function useDialog() {
  const dialog = computed(() => dialogs.value[dialogs.value.length - 1]);

  return {
    dialog,
    openDialog(title: string, subtitle: string, fields: Field[]) {
      return new Dialog(title, subtitle, fields).open();
    },
  };
}
