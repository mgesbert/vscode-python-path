# Python Path

This extension adds a single command, "Copy Python Path", which copies the python path of the current file to the clipboard.

## Features

Accessible from:

- Command
- Explorer contextual menu
- Edit contextual menu

### Basic Copy Python Path

Copies the full module name of the current file to the clipboard.

![Basic Copy Python Path](https://raw.githubusercontent.com/mgesbert/vscode-python-path/master/images/readme_1.gif)

### Generate import statement

Copies an import statement for the selected text to the clipboard.
In case of a simple selection, the generated statement will be:

```
from module.name import selected_text
```

In case of a multiple selection, the generated statement will be:

```
from module.name import (
    selected_text_1,
    selected_text_2,
    [...]
    selected_text_n,
)
```

![Generate import statement](https://raw.githubusercontent.com/mgesbert/vscode-python-path/master/images/readme_2.gif)

## Miscellaneous

Inspiration from the Sublime Package: https://github.com/Mimino666/SublimeText2-python-package-to-clipboard

## Credits

- https://github.com/mgesbert
- https://github.com/nfau
