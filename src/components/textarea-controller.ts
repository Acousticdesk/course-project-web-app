export class TextareaController {
  static MIN_HEIGHT = 100;

  static handleTextareaInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "1px";

    if (textarea.scrollHeight < TextareaController.MIN_HEIGHT) {
      textarea.style.height = `${TextareaController.MIN_HEIGHT}px`;
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  static init(selector: string) {
    const textarea = document.querySelector(selector) as HTMLTextAreaElement;

    if (!textarea) {
      throw new Error("Textarea was not found in the DOM");
    }

    textarea.addEventListener("input", TextareaController.handleTextareaInput);
  }

  static remove(selector: string) {
    const textarea = document.querySelector(selector) as HTMLTextAreaElement;

    if (!textarea) {
      throw new Error("Textarea was not found in the DOM");
    }

    textarea.removeEventListener(
      "input",
      TextareaController.handleTextareaInput
    );
  }
}
