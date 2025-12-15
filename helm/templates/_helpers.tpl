{{- define "banking.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}
