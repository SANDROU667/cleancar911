// Keep the imported workbook intact; correct only spelling in public labels.
export function serviceLabel(value: string) {
  return value
    .replace(/поствавить/g, 'поставить')
    .replace(/болансировкой/g, 'с балансировкой')
    .replace(/RunFlad/g, 'RunFlat')
    .replace(/Востановительная/g, 'Восстановительная')
    .replace(/Образивная/g, 'Абразивная')
    .replace(/Антидоджь/g, 'Антидождь')
    .replace(/коврикоа/g, 'ковриков')
    .replace(/Металические/g, 'Металлические')
    .replace(/КОМКЛЕКС/g, 'КОМПЛЕКС')
    .replace(/Антибакериальное Озонирование/g, 'Антибактериальное озонирование')
    .replace(/Химчистка салон(?=\s|$)/g, 'Химчистка салона')
    .replace(/Кросовер/g, 'Кроссовер')
    .replace(/Микро автобус/g, 'Микроавтобус')
    .replace(/минивэн/gi, 'Минивэн')
    .replace(/минивен/gi, 'Минивэн')
    .replace(/взависимости/g, 'в зависимости')
}
