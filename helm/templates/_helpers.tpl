{{- define "bankingapp.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}
