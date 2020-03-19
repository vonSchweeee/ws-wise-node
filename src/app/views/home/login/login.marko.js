// Compiled using marko@4.19.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/br.com.aggin.lecni$1.0.0/src/app/views/home/login/login.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>Entrar</title></head><body>");

  component_globals_tag({}, out);

  out.w("<p class=\"text\">Entrar</p><p class=\"description\">Use o email de sua corporação</p><form name=\"login\" action=\"/weblogin\" method=\"post\"><input type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email\" onblur=\"validacaoEmail(login.email)\" maxlength=\"60\" size=\"65\"><div id=\"msgemail\"></div><input type=\"password\" name=\"senha\" placeholder=\"Senha\" size=\"65\"><div id=\"msgsenha\"></div><input id=\"btnLogin\" type=\"submit\" value=\"Entrar\" method=\"POST\"></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "15");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/br.com.aggin.lecni$1.0.0/src/app/views/home/login/login.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
