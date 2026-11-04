/* ==========================================================================
   contact-form.js  -  Weblink Computers
   Enquiry form built from contactPageData.form (fields, rules, messages, security settings).
   FRONTEND ONLY: after all checks pass it calls contactForm.send(values), which does nothing yet.

   Browser-side checks (for a good experience; real protection must ALSO be done on the server later):
     - every value is cleaned (control characters, < > removed, spaces tidied) before checking
     - strict rules per field (required, length, pattern); phone = 10-digit Indian mobile
     - course must be one of the real courses (checked against the data, not the typed text)
     - no web links in the message (spam)
     - hidden honeypot field + minimum fill time to catch bots
     - cooldown between two sends; the button is disabled while sending
     - values are only ever written as text (never as HTML)
   Global: contactForm
   ========================================================================== */

const contactForm = {

  /* ---------- cleaning ---------- */
  clean: {
    /* remove HTML tags, control characters and angle brackets, collapse spaces */
    text(value) {
      return String(value).replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim();
    },
    name(value) { return contactForm.clean.text(value); },
    email(value) { return contactForm.clean.text(value).replace(/\s/g, "").toLowerCase(); },
    /* "+91 98765-43210", "098765 43210" -> "9876543210" */
    phone(value) {
      const digits = String(value).replace(/\D/g, "");
      if (digits.length === 12 && digits.indexOf("91") === 0) return digits.slice(2);
      if (digits.length === 11 && digits.indexOf("0") === 0) return digits.slice(1);
      return digits;
    }
  },

  /* ---------- checking one field: returns an error message or "" ---------- */
  check(field, rawValue) {
    const value = contactForm.clean[field.normalize] ? contactForm.clean[field.normalize](rawValue) : contactForm.clean.text(rawValue);
    const messages = field.messages;
    if (!value) return field.required ? messages.required : "";

    if (field.type === "select") {
      return coursesData.courses.some((course) => String(course.id) === value) ? "" : messages.invalid;
    }
    if (field.minLength && value.length < field.minLength) return messages.short || messages.invalid;
    if (field.maxLength && value.length > field.maxLength) return messages.invalid;
    if (field.pattern && !new RegExp(field.pattern, "u").test(value)) return messages.invalid;
    if (field.blockLinks && /(https?:\/\/|www\.|[a-z0-9-]+\.(com|in|net|org|co|xyz|ru|top|info)\b)/i.test(value)) return messages.invalid;
    return "";
  },

  /* ---------- sending (frontend only for now) ---------- */
  /* Later: send `values` to the real service here (it must return a Promise). */
  send(values) {
    return Promise.resolve(values);
  },

  /* ---------- cooldown between sends ---------- */
  lastSentAt() {
    try { return Number(window.sessionStorage.getItem("weblinkEnquiryAt")) || 0; } catch (error) { return contactForm.memoryAt || 0; }
  },

  markSent() {
    contactForm.memoryAt = Date.now();
    try { window.sessionStorage.setItem("weblinkEnquiryAt", String(Date.now())); } catch (error) { /* ignore */ }
  },

  /* ---------- building ---------- */
  buildField(field, state) {
    const id = "field" + field.id;
    const errorId = id + "Error";
    let control;

    if (field.type === "select") {
      control = dom.create("select", { id: id, name: field.name }, [dom.create("option", { value: "", text: field.placeholder })].concat(
        coursesData.courses.map((course) => dom.create("option", { value: String(course.id), text: course.name }))));
    } else if (field.type === "textarea") {
      control = dom.create("textarea", { id: id, name: field.name, rows: 4, placeholder: field.placeholder, maxlength: field.maxLength, autocomplete: "off" });
    } else {
      control = dom.create("input", {
        id: id, name: field.name, type: field.type, placeholder: field.placeholder, maxlength: field.attrMaxLength || field.maxLength,
        autocomplete: field.autocomplete, inputmode: field.inputmode
      });
    }
    control.setAttribute("aria-describedby", errorId);
    if (field.required) control.setAttribute("aria-required", "true");

    const error = dom.create("p", { class: "fieldError", id: errorId, role: "alert" });
    const counter = field.showCounter ? dom.create("span", { class: "fieldCounter", text: "0/" + field.maxLength }) : null;

    const show = (message) => {
      error.textContent = message;
      control.classList.toggle("isInvalid", Boolean(message));
      control.setAttribute("aria-invalid", message ? "true" : "false");
    };
    const validate = () => { const message = contactForm.check(field, control.value); show(message); return message; };

    control.addEventListener("blur", validate);
    control.addEventListener("change", validate);
    control.addEventListener("input", () => {
      if (counter) counter.textContent = control.value.length + "/" + field.maxLength;
      if (control.classList.contains("isInvalid")) validate();
    });

    state.fields.push({ field: field, control: control, validate: validate, show: show, counter: counter });
    return dom.create("div", { class: "field" }, [
      dom.create("label", { for: id, text: field.label }),
      control,
      dom.create("div", { class: "fieldFoot" }, [error, counter])
    ]);
  },

  build(data) {
    const state = { fields: [], renderedAt: Date.now() };
    const security = data.security;

    const honeypot = dom.create("div", { class: "fieldTrap", "aria-hidden": "true" },
      dom.create("input", { type: "text", name: security.honeypotName, tabindex: "-1", autocomplete: "off" }));
    const note = dom.create("div", { class: "formNote", role: "status", "aria-live": "polite" });
    const button = dom.create("button", { class: "btn btnPrimary btnFull", type: "submit", text: data.submitLabel });

    const showNote = (message, kind) => {
      note.textContent = message;
      note.className = "formNote" + (message ? " isShown " + kind : "");
    };

    const rows = data.rows.map((ids) => dom.create("div", { class: "fieldRow" }, ids.map((id) => {
      const field = dom.byId(data.fields, id);
      return field ? contactForm.buildField(field, state) : null;
    })));

    const form = dom.create("form", { class: "enquiryForm", novalidate: true, autocomplete: "on" }, [rows, honeypot, button, note]);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showNote("", "");

      /* bots: honeypot filled, or sent too fast */
      const trapValue = form.elements[security.honeypotName].value;
      const tooFast = Date.now() - state.renderedAt < security.minFillSeconds * 1000;
      if (trapValue || tooFast) { showNote(security.botMessage, "isError"); return; }

      /* cooldown */
      if (Date.now() - contactForm.lastSentAt() < security.cooldownSeconds * 1000) { showNote(security.waitMessage, "isError"); return; }

      /* rules */
      const failed = state.fields.filter((item) => item.validate());
      if (failed.length) { failed[0].control.focus(); showNote(security.fixMessage, "isError"); return; }

      const values = {};
      state.fields.forEach((item) => {
        const clean = contactForm.clean[item.field.normalize] || contactForm.clean.text;
        values[item.field.name] = clean(item.control.value);
      });

      button.disabled = true;
      button.textContent = data.sendingLabel;
      contactForm.send(values).then(() => {
        contactForm.markSent();
        form.reset();
        state.fields.forEach((item) => { item.show(""); if (item.counter) item.counter.textContent = "0/" + item.field.maxLength; });
        state.renderedAt = Date.now();
        showNote(data.successMessage, "isSuccess");
      }).catch(() => {
        showNote(data.failMessage, "isError");
      }).then(() => {
        button.disabled = false;
        button.textContent = data.submitLabel;
      });
    });

    return form;
  }
};
