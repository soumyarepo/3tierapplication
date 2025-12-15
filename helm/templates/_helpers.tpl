{{- define "banking-app.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}
